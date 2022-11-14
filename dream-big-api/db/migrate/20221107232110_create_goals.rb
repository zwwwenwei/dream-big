class CreateGoals < ActiveRecord::Migration[7.0]
  def change
    create_table :goals do |t|
      t.string :goal_text
      t.boolean :status
      t.bigint :section_id
      t.timestamps
    end
  end
end
