class CreateAvatarBodyParts < ActiveRecord::Migration[7.0]
  def change
    create_table :avatar_body_parts do |t|

      t.timestamps
    end
  end
end
