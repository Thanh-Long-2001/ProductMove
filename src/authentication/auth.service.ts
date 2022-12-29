import { Injectable } from '@nestjs/common';
import { AdminService } from '../admin/admin.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly adminService: AdminService, 
        private readonly jwtService: JwtService,

        ) {}

        async validateUser(username: string, password: string): Promise<any> {
            const user = await this.adminService.findUser(username);
            const isPasswordMatch = bcrypt.compare(password, user.password);
            if(user && isPasswordMatch) {
                return user;
            }
            return null;
        }
    
        async getJwtToken(user: any) {
            const payload = { 
                _id: user._id,
                username: user.username,
                email: user.email, 
                role: user.role,
            };
            
            return this.jwtService.signAsync(payload)
          
        }
    
        async getRefreshToken(userId: any, user: any): Promise<string> {
            var expiresIn = new Date();
            const payload = { 
                _id: user._id,
                username: user.username,
                email: user.email, 
                role: user.role,
            };
            const userDataToUpdate = {
                refreshToken: await this.jwtService.signAsync(payload),
                refreshTokenExp: expiresIn.setDate(expiresIn.getDate() + 3),
              };
        
            await this.adminService.updateUserRFToken(userId, userDataToUpdate.refreshToken, userDataToUpdate.refreshTokenExp);
            return userDataToUpdate.refreshToken;
        }
}