import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { PartiesService } from './parties.service';
import { CreatePartyDto } from './dto/create-party.dto';
import { UpdatePartyDto } from './dto/update-party.dto';

@WebSocketGateway()
export class PartiesGateway {
  constructor(private readonly partiesService: PartiesService) {}

  @SubscribeMessage('createParty')
  create(@MessageBody() createPartyDto: CreatePartyDto) {
    return this.partiesService.create(createPartyDto);
  }

  @SubscribeMessage('findAllParties')
  findAll() {
    return this.partiesService.findAll();
  }

  @SubscribeMessage('findOneParty')
  findOne(@MessageBody() id: number) {
    return this.partiesService.findOne(id);
  }

  @SubscribeMessage('updateParty')
  update(@MessageBody() updatePartyDto: UpdatePartyDto) {
    return this.partiesService.update(updatePartyDto.id, updatePartyDto);
  }

  @SubscribeMessage('removeParty')
  remove(@MessageBody() id: number) {
    return this.partiesService.remove(id);
  }
}
