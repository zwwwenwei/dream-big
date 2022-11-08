class CreateGoals < ActiveRecord::Migration[7.0]
  def change
    create_table :goals do |t|
      t.string :goalText
      t.boolean :status
      t.timestamps
    end
  end
end
