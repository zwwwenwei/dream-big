class AddCategoryToStar < ActiveRecord::Migration[7.0]
  def change
    add_foreign_key :journey_stars, :categories, ondelete: :cascade, column: :category_id
  end
end
