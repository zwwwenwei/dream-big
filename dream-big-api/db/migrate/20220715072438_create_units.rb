class CreateUnits < ActiveRecord::Migration[7.0]
  def change
    create_table :units do |t|
      t.string :name
      t.string :description, limit: 4096
      t.string :code

      t.timestamps
    end
  end
end
