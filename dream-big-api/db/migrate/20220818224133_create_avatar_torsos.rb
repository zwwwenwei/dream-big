class CreateAvatarTorsos < ActiveRecord::Migration[7.0]
  def change
    create_table :avatar_torsos do |t|
      t.string :imgpath
    end
  end
end
