class CreateAssessments < ActiveRecord::Migration[7.0]
  def change
    create_table :assessments do |t|
      t.bigint :journeyID
      t.bigint :categoryID
      t.timestamps
    end
  end
end
