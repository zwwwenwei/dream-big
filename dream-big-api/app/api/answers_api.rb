require 'grape'

class AnswersApi < Grape::API
  desc 'Allow retrieval of an Answer in the Assessment'
  get '/answer/:id' do
    answers_parameters = ActionController::Parameters.new(params)
      .permit(
        :id
      )

    # Auth

    result = Answers.find(params[:id])
    present result, with: Entities::AvatarEntity
  end

  desc 'Allow creation of an Answers'
  params do
  
    requires :answers_head_id, type: Integer, desc: 'Answers Head ID'
 

  end
  post '/Answers' do
    answers_parameters = ActionController::Parameters.new(params)
      .permit(
        :answers_head_id,
   
      )

    # Auth...

    result = Answers.create!(answers_parameters)

    present result, with: Entities::AvatarEntity
  end

  desc 'Allow updating of a Answers'
  params do
    
    optional :answers_head_id, type: Integer, desc: 'Answers Head ID'

  end
  put '/Answers/:id' do
    answers_parameters = ActionController::Parameters.new(params)
      .permit(
        :
      )

    # Auth

    result = Answers.find(params[:id])
    result.update! answers_parameters

    present result, with: Entities::AvatarEntity
  end

  desc 'Delete the Answers with the indicated id'
  params do
    requires :id, type: Integer, desc: 'The id of the Answers to delete'
  end
  delete '/Answers/:id' do
    Answers.find(params[:id]).destroy!
    true
  end

  get '/Answers' do
    result = Answers.all

    present result, with: Entities::AvatarEntity
  end
end