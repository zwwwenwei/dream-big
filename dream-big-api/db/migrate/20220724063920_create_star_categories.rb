class CreateStarCategories < ActiveRecord::Migration[7.0]
  def change
    create_table :star_categories do |t|

      t.timestamps
    end
  end
end
