class CreateAnswers < ActiveRecord::Migration[7.0]
  def change
    create_table :answers do |t|
      t.string :answer
      t.bigint :category_question_id
      t.bigint :assessment_id
      t.timestamps
    end
  end
end
