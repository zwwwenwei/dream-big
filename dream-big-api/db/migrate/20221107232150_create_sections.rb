class CreateSections < ActiveRecord::Migration[7.0]
  def change
    create_table :sections do |t|
      t.bigint :planetID
      t.bigint :categoryID
      t.timestamps
    end
  end
end
