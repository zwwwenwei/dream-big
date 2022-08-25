class CreatePlanetSkins < ActiveRecord::Migration[7.0]
  def change
    create_table :planet_skins do |t|
      t.string :name
      t.string :color
      t.string :asset
      t.timestamps
    end
  end
end
