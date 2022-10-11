class CreateAvatars < ActiveRecord::Migration[7.0]
  def change
    create_table :avatars do |t|
      t.bigint :avatar_head_id
      t.bigint :avatar_torsos_id
      t.bigint :avatar_hairs_id
      t.bigint :avatar_accessories_id
    end
  end
end
