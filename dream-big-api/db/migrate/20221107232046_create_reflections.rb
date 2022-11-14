class CreateReflections < ActiveRecord::Migration[7.0]
  def change
    create_table :reflections do |t|
      t.string :reflection_text
      t.bigint :section_id
      t.bigint :goal_id
      t.timestamps
    end
  end
end
