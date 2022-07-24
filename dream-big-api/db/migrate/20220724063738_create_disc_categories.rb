class CreateDiscCategories < ActiveRecord::Migration[7.0]
  def change
    create_table :disc_categories do |t|

      t.timestamps
    end
  end
end
