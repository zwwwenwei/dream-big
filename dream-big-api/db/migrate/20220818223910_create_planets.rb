class CreatePlanets < ActiveRecord::Migration[7.0]
  def change
    create_table :planets do |t|
      t.string :name
      t.boolean :status
      t.bigint :star_system_id
      t.bigint :skin_id
      t.timestamps
    end
    add_foreign_key :planets, :star_systems, on_delete: :cascade, column: :star_system_id
    add_foreign_key :planets, :planet_skins, column: :skin_id
  end
end
