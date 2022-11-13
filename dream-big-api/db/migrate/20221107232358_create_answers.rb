class CreateAnswers < ActiveRecord::Migration[7.0]
  def change
    create_table :answers do |t|
      t.string :answer
      t.bigint :questions_ID
      t.bigint :assessment_ID
      t.timestamps
    end
  end
end
