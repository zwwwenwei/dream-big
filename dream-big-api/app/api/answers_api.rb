require 'grape'

class AnswersApi < Grape::API
  desc 'Allow retrieval of an Answer in the Assessment'
  get '/answers/:id' do
    answers_parameters = ActionController::Parameters.new(params)
      .permit(
        :id
        :question_id
        :assessment_id
        :question_text

      )

    # Auth

    result = Answers.find(params[:id])
    present result, with: Entities::AnswersEntity
  end

  desc 'Allow creation of an Answers'
  params do
    requires :id , type: Integer, desc: 'ID of Answer'
    requires :question_id, type: Integer, desc: 'question ID'
    requires :assessment_id, type: Integer, desc: 'assessment ID'
    requires :question_text, type: String, desc: 'question text'
  end
  post '/Answers' do
    answers_parameters = ActionController::Parameters.new(params)
      .permit(
        :id
        :question_id
        :assessment_id
        :question_text
   
      )

    # Auth...

    result = Answers.create!(answers_parameters)

    present result, with: Entities::AnswersEntity
  end

  desc 'Allow updating of a Answers'
  params do
    requires :id , type: Integer, desc: 'ID of Answer'
    optional :question_id, type: Integer, desc: 'question ID'
    optional :assessment_id, type: Integer, desc: 'assessment ID'
    optional :question_text, type: String, desc: 'question text'

  end
  put '/Answers/:id' do
    answers_parameters = ActionController::Parameters.new(params)
      .permit(
        :id
        :question_id
        :assessment_id
        :question_text
      )

    # Auth

    result = Answers.find(params[:id])
    result.update! answers_parameters

    present result, with: Entities::AnswersEntity
  end

  desc 'Delete the Answers with the indicated id'
  params do
    required :id , type: Integer, desc: 'ID of Answer'
  end
  delete '/Answers/:id' do
    Answers.find(params[:id]).destroy!
    true
  end

  get '/Answers' do
    result = Answers.all

    present result, with: Entities::AnswersEntity
  end
end