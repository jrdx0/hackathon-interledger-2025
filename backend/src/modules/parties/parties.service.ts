import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Prisma } from 'generated/prisma';
import { PrismaService } from 'src/prisma.service';

import { CreatePartyDto } from './dto/create-party.dto';
import { UpdatePartyDto } from './dto/update-party.dto';

@Injectable()
export class PartiesService {
  constructor(private readonly prisma: PrismaService) {}

  create(currentUser: { username: string }, createPartyDto: CreatePartyDto) {
    return this.prisma.party.create({
      data: { ...createPartyDto, created_by_id: currentUser.username },
    });
  }

  /**
   * Find all parties
   *
   * @returns The parties
   */
  findAll() {
    return this.prisma.party.findMany();
  }

  /**
   * Find all parties that the current user created
   *
   * @param currentUser - The current user
   *
   * @returns The parties
   */
  async findAllReceive(currentUser: { username: string }) {
    const parties = await this.prisma.party.findMany({
      where: {
        created_by_id: currentUser.username,
      },
      include: {
        party_users: {
          include: {
            user: {
              omit: { password: true },
            },
          },
        },
      },
    });

    if (!parties) {
      throw new NotFoundException(`Parties no encontradas`);
    }

    if (parties.length === 0) {
      throw new NotFoundException(`Parties no encontradas`);
    }

    return parties.map((party) => {
      const { party_users, ...rest } = party;

      return {
        ...rest,
        users: party_users.map((party_user) => party_user.user),
      };
    });
  }

  /**
   * Find all parties that the current user is a member of
   *
   * @param currentUser - The current user
   *
   * @returns The parties
   */
  async findAllSend(currentUser: { username: string }) {
    const parties = await this.prisma.party.findMany({
      where: {
        party_users: {
          some: {
            user_username: currentUser.username,
          },
        },
      },
      include: {
        party_users: {
          include: {
            user: {
              omit: { password: true },
            },
          },
        },
      },
    });

    if (!parties) {
      throw new NotFoundException(`Parties no encontradas`);
    }

    if (parties.length === 0) {
      throw new NotFoundException(`Parties no encontradas`);
    }

    return parties.map((party) => {
      const { party_users, ...rest } = party;

      return {
        ...rest,
        users: party_users.map((party_user) => party_user.user),
      };
    });
  }

  /**
   * Find a party by id
   *
   * @param currentUser - The current user
   * @param id - The party id
   *
   * @returns The party
   */
  async findOne(currentUser: { username: string }, id: string) {
    const party = await this.prisma.party.findUnique({
      where: { id },
      include: {
        party_users: {
          include: {
            user: {
              select: { username: true },
            },
          },
        },
        creator_by: {
          omit: { password: true },
        },
      },
    });

    if (!party) {
      throw new NotFoundException(`Party con id ${id} no encontrada`);
    }

    if (
      party.creator_by.username !== currentUser.username ||
      party.party_users.some(
        (user) => user.user.username !== currentUser.username,
      )
    ) {
      throw new NotFoundException(`Party con id ${id} no encontrada`);
    }

    return party;
  }

  update(id: string, updatePartyDto: UpdatePartyDto) {
    return this.prisma.party.update({
      where: { id },
      data: { ...updatePartyDto },
    });
  }

  async lockAccess(id: string) {
    return this.prisma.party.update({
      where: { id },
      data: { lock_access: true },
    });
  }

  async unlockAccess(id: string) {
    return this.prisma.party.update({
      where: { id },
      data: { lock_access: false },
    });
  }

  async remove(currentUser: { username: string }, id: string) {
    const party = await this.prisma.party.findUnique({
      where: { id },
      select: { created_by_id: true },
    });

    if (!party) {
      throw new NotFoundException(`Party con id ${id} no encontrada`);
    }

    if (party.created_by_id !== currentUser.username) {
      throw new BadRequestException(
        'No puedes eliminar una party que no creaste',
      );
    }

    return this.prisma.party.delete({ where: { id } });
  }

  async acceptInvitation(currentUser: { username: string }, partyId: string) {
    const party = await this.prisma.party.findUnique({
      where: { id: partyId },
      select: {
        creator_by: { select: { username: true } },
        party_users: { select: { user_username: true } },
      },
    });

    if (!party) {
      throw new NotFoundException(`Party con id ${partyId} no encontrada`);
    }

    if (party.creator_by.username === currentUser.username) {
      throw new BadRequestException(
        'No puedes aceptar la invitación de ti mismo',
      );
    }

    if (
      party.party_users.some(
        (user) => user.user_username === currentUser.username,
      )
    ) {
      throw new BadRequestException(
        'Ya has aceptado la invitación a esta party',
      );
    }

    return this.prisma.partyUsers.create({
      data: { party_id: partyId, user_username: currentUser.username },
      omit: { user_username: true },
    });
  }

  async throwIfNotExists(partyId: string) {
    const party = await this.prisma.party.findUnique({
      where: { id: partyId },
    });

    if (!party) {
      throw new NotFoundException(`Party con id ${partyId} no encontrada`);
    }
  }

  async removeUser(
    currentUser: { username: string },
    partyId: string,
    usernameToDelete: string,
  ) {
    const party = await this.prisma.party.findFirst({
      where: { id: partyId },
      select: { created_by_id: true },
    });

    if (!party) {
      throw new NotFoundException(`Party con id ${partyId} no encontrada`);
    }

    if (party.created_by_id !== currentUser.username) {
      throw new BadRequestException(
        'No puedes eliminar a un usuario de una party que no creaste',
      );
    }

    return this.prisma.partyUsers.delete({
      where: {
        party_id_user_username: {
          party_id: partyId,
          user_username: usernameToDelete,
        },
      },
    });
  }
}
