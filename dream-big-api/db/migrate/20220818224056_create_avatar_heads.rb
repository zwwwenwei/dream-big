class CreateAvatarHeads < ActiveRecord::Migration[7.0]
  def change
    create_table :avatar_heads do |t|
      t.string :imgpath
    end
  end
end
