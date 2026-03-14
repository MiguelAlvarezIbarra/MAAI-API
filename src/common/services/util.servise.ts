import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

@Injectable()
export class UtilService {

  constructor(private jwtService: JwtService) {}

  public async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  public async checkPassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compareSync(password, hash);
  }

  // Obtener el payload del usuario
  public getPayload(user: { id: number; name: string; lastname?: string | null; createdAt: Date }) {
    return {
      id: user.id,
      name: user.name,
      lastname: user.lastname,
      createdAt: user.createdAt,
    };
  }

  // Generar access token (60 segundos)
  public generateAccessToken(payload: object): string {
    return this.jwtService.sign(payload, { expiresIn: '60s' });
  }

  // Generar refresh token (7 días)
  public generateRefreshToken(payload: object): string {
    return this.jwtService.sign(payload, { expiresIn: '7d' });
  }
}
