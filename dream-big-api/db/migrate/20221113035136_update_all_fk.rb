class UpdateAllFk < ActiveRecord::Migration[7.0]
  def change
    add_foreign_key :answers, :assessments, ondelete: :cascade, column: :assessment_ID
    add_foreign_key :category_questions, :assessments, ondelete: :cascade, column: :assessment_ID
    add_foreign_key :planets, :journey, ondelete: :cascade, column: :journeys_ID
    add_foreign_key :sections, :planets, ondelete: :cascade, column: :planets_ID
    add_foreign_key :plans, :sections, ondelete: :cascade, column: :sections_ID
    add_foreign_key :goals, :sections, ondelete: :cascade, column: :sections_ID
    add_foreign_key :reflections, :sections, ondelete: :cascade, column: :sections_ID
    add_foreign_key :reflections, :goals, ondelete: :cascade, column: :goals_ID
    add_foreign_key :journeys, :student, ondelete: :cascade, column: :student_ID
  end
end
