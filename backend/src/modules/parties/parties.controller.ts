import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { CurrentUser } from '../auth/decorators/current-user.decorator';

import { PartiesService } from './parties.service';
import { CreatePartyDto } from './dto/create-party.dto';
import { UpdatePartyDto } from './dto/update-party.dto';

@Controller('parties')
export class PartiesController {
  constructor(private readonly partiesService: PartiesService) {}

  @Post()
  create(
    @CurrentUser() currentUser: { username: string },
    @Body() createPartyDto: CreatePartyDto,
  ) {
    return this.partiesService.create(currentUser, createPartyDto);
  }

  @Get()
  findAll() {
    return this.partiesService.findAll();
  }

  @Get(':id')
  findOne(
    @CurrentUser() currentUser: { username: string },
    @Param('id') id: string,
  ) {
    return this.partiesService.findOne(currentUser, id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePartyDto: UpdatePartyDto) {
    return this.partiesService.update(id, updatePartyDto);
  }

  @Delete(':id')
  remove(
    @CurrentUser() currentUser: { username: string },
    @Param('id') id: string,
  ) {
    return this.partiesService.remove(currentUser, id);
  }

  @Patch('lock-access/:id')
  lockAccess(@Param('id') id: string) {
    return this.partiesService.lockAccess(id);
  }

  @Patch('unlock-access/:id')
  unlockAccess(@Param('id') id: string) {
    return this.partiesService.unlockAccess(id);
  }

  @Patch('remove-user/:id')
  removeUser(
    @CurrentUser() currentUser: { username: string },
    @Param('id') id: string,
    @Body() body: { username: string },
  ) {
    return this.partiesService.removeUser(currentUser, id, body.username);
  }
}

@Controller('party/invitation')
export class PartyInvitationController {
  constructor(private readonly partiesService: PartiesService) {}

  @Get(':partyId')
  acceptInvitation(
    @CurrentUser() currentUser: { username: string },
    @Param('partyId') partyId: string,
  ) {
    return this.partiesService.acceptInvitation(currentUser, partyId);
  }
}
