import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JwtToken } from "./entity/jwtToken.entity";

@Injectable()
export class JwtTokenService {
    constructor( @InjectRepository(JwtToken) 
        private readonly jwtTokenRepository: Repository<JwtToken>
    ){}

    

}