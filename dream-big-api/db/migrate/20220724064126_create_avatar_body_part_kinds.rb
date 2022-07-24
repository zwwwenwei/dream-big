class CreateAvatarBodyPartKinds < ActiveRecord::Migration[7.0]
  def change
    create_table :avatar_body_part_kinds do |t|

      t.timestamps
    end
  end
end
