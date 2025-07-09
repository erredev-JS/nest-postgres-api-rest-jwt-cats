import { Cat } from 'src/cats/entities/cat.entity';
import {Entity, Column, DeleteDateColumn, OneToMany} from 'typeorm'

@Entity()
export class Breed {
    
    @Column({generated: true, primary: true})
    id: number;

    @Column({unique: true})
    name: string

    @OneToMany(() => Cat, (cat) => cat.breed)
    cats: Cat[]

    @DeleteDateColumn()
    deletedAt: Date
}
