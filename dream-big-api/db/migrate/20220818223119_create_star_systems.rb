class CreateStarSystems < ActiveRecord::Migration[7.0]
  def change
    create_table :star_systems do |t|
      t.boolean :status
      t.timestamps
    end
  end
end
