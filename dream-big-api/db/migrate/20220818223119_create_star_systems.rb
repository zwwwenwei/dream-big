class CreateStarSystems < ActiveRecord::Migration[7.0]
  def change
    create_table :star_systems do |t|
      t.string :name
      t.boolean :status
      t.bigint :student_journey_id
      t.timestamps
    end
    add_foreign_key :star_systems, :student_journeys, on_delete: :cascade, column: :student_journey_id
  end
end
