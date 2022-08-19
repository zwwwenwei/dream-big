class CreateStars < ActiveRecord::Migration[7.0]
  def change
    create_table :stars do |t|
      t.string :goals
      t.string :reflection
      t.boolean :status
      t.timestamps
    end
  end
end
