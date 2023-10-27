import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Rol{
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column()
    type: string

    @Column({default:true})
    state: boolean
}