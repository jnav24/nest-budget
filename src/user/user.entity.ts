import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        unique: true,
    })
    username: string;

    @Column()
    password: string;

    @Column({
        nullable: true,
        select: false,
    })
    rememberMe: string;

    @Column({
        type: 'tinyint',
        default: '1',
    })
    active: number;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;

    @Column({
        default: '',
        select: false,
    })
    passwordResetToken: string;

    @Column({
        type: 'timestamp',
        nullable: true,
        select: false,
    })
    passwordResetExpires: string;
}
