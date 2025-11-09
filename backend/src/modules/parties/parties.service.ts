import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePartyDto } from './dto/create-party.dto';
import { UpdatePartyDto } from './dto/update-party.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from 'generated/prisma';

@Injectable()
export class PartiesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createPartyDto: CreatePartyDto) {
    return this.prisma.party.create({ data: createPartyDto });
  }

  findAll() {
    return this.prisma.party.findMany();
  }

  findOne(id: string) {
    return this.prisma.party.findUnique({
      where: { id },
    });
  }

  update(id: string, updatePartyDto: UpdatePartyDto) {
    return this.prisma.party.update({
      where: { id },
      data: { ...updatePartyDto },
    });
  }

  async remove(id: string) {
    try {
      return await this.prisma.party.delete({ where: { id } });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2025'
      ) {
        throw new NotFoundException(`Party con id ${id} no encontrada`);
      }
      throw new InternalServerErrorException('Error al eliminar la party');
    }
  }
}
