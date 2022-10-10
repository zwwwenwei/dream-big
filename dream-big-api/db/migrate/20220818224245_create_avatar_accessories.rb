class CreateAvatarAccessories < ActiveRecord::Migration[7.0]
  def change
    create_table :avatar_accessories do |t|
      t.string :imgpath
    end
  end
end
