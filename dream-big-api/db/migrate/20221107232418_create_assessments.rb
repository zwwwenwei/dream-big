class CreateAssessments < ActiveRecord::Migration[7.0]
  def change
    create_table :assessments do |t|
      t.bigint :journey_ID
      t.bigint :category_ID
      t.timestamps
    end
    add_foreign_key :assessments, :journey, ondelete: :cascade, column: :journey_ID
    add_foreign_key :assessments, :category, ondelete: :cascade, column: :category_ID
  end
end
