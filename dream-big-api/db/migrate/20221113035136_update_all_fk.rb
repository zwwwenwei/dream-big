class UpdateAllFk < ActiveRecord::Migration[7.0]
  def change
    add_foreign_key :journeys, :students, ondelete: :cascade, column: :student_id
    add_foreign_key :answers, :assessments, ondelete: :cascade, column: :assessment_id
    add_foreign_key :answers, :category_questions, ondelete: :cascade, column: :category_question_id
    add_foreign_key :category_questions, :categories, ondelete: :cascade, column: :category_id
    add_foreign_key :planets, :journeys, ondelete: :cascade, column: :journey_id
    add_foreign_key :sections, :planets, ondelete: :cascade, column: :planet_id
    add_foreign_key :sections, :categories, ondelete: :cascade, column: :category_id
    add_foreign_key :plans, :sections, ondelete: :cascade, column: :section_id
    add_foreign_key :plans, :goals, ondelete: :cascade, column: :goal_id
    add_foreign_key :goals, :sections, ondelete: :cascade, column: :section_id
    add_foreign_key :reflections, :sections, ondelete: :cascade, column: :section_id
    add_foreign_key :reflections, :goals, ondelete: :cascade, column: :goal_id
  end
end
