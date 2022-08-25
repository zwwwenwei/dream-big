class CreateStars < ActiveRecord::Migration[7.0]
  def change
    create_table :stars do |t|
      t.string :name
      t.string :goals
      t.string :reflection
      t.boolean :status
      t.bigint :star_system_id
      t.bigint :skin_id
      t.timestamps
    end
    add_foreign_key :stars, :star_systems, on_delete: :cascade, column: :star_system_id
    add_foreign_key :stars, :star_skins, column: :skin_id
  end
end
