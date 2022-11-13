class CreateReflections < ActiveRecord::Migration[7.0]
  def change
    create_table :reflections do |t|
      t.string :reflectionText
      t.bigint :section_ID
      t.bigint :goal_ID
      t.timestamps
    end
  end
end
