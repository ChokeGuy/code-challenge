
import { BaseEntity, Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity({ name: "resources" })
export class Resource extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 255, nullable: false })
    @Index("idx_resources_name_unique", { unique: true }) // Unique Index
    name!: string;

    @Column({
        type: "bigint", default: 0, nullable: false, transformer: {
            to: (value: number) => value,
            from: (value: string) => Number(value)
        }
    })
    quantity!: number;

    @Column({
        type: "numeric",
        precision: 10,
        scale: 2,
        default: 0,
        nullable: false
    })
    @Index("idx_resources_price")
    price!: number;

    @CreateDateColumn({ type: "timestamptz", name: "created_at", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @UpdateDateColumn({ type: "timestamptz", name: "updated_at", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt!: Date;
}
