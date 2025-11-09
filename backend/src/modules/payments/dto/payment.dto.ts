import { IsString, IsUrl } from 'class-validator';

export class PaymentDto {
  @IsString()
  @IsUrl()
  receiver_wallet_address_url: string;

  @IsString()
  @IsUrl()
  sender_wallet_address_url: string;
}

export class ContinuePaymentDto {
  @IsString()
  access_token: string;
}
