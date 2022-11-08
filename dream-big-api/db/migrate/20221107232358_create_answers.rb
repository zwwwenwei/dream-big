class CreateAnswers < ActiveRecord::Migration[7.0]
  def change
    create_table :answers do |t|
      t.string :answer
      t.bigint :questionID
      t.bigint :assessmentID
      t.timestamps
    end
  end
end
