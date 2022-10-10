class CreateStarSkins < ActiveRecord::Migration[7.0]
  def change
    create_table :star_skins do |t|
      t.string :colour
      t.string :asset
    end
    
  end
end
