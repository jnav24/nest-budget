import {CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        if (!request.headers.authorization) {
            return false;
        }

        await this.validateToken(request.headers.authorization);
    }

    private async validateToken(auth: string) {
        const [method, token] = auth.split(' ');

        if (method.toLowerCase() !== 'bearer') {
            throw new HttpException('Invalid Token', HttpStatus.FORBIDDEN);
        }

        try {
            // return await jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
        }
    }
}
