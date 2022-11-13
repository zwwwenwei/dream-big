class CreateAssessments < ActiveRecord::Migration[7.0]
  def change
    create_table :assessments do |t|
      t.bigint :journey_id
      t.bigint :category_id
      t.timestamps
    end
    add_foreign_key :assessments, :journeys, ondelete: :cascade, column: :journey_id
    add_foreign_key :assessments, :categories, ondelete: :cascade, column: :category_id
  end
end
