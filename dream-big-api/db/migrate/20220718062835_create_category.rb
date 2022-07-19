class CreateCategory < ActiveRecord::Migration[7.0]
  def change
    create_table :category do |t|
        t.string "name"
        t.string "description", limit: 4096
        t.string "weight"
  
      t.timestamps
    end
  end
end
