class CreateAvatarHairs < ActiveRecord::Migration[7.0]
  def change
    create_table :avatar_hairs do |t|
      t.string :imgpath
    end
  end
end
