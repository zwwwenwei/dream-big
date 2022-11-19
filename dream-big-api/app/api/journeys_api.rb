require 'grape'

class JourneysApi < Grape::API
  desc 'Allow retrieval of an Journey'
  get '/journeys/:id' do
    # Auth

    result = Journey.find(params[:id])
    present result, with: Entities::JourneysEntity
  end

  desc 'Allow creation of a Journey'
  params do
    requires :id, type: Integer, desc: 'ID of Journey'
    requires :student_id, type: Integer, desc: 'student ID'
  end
  post '/journeys' do
    journey_parameters = ActionController::Parameters
       .new(params)
       .permit(
         :id,
         :student_id
       )

    # Auth...

    result = Journey.create!(journey_parameters)

    present result, with: Entities::JourneysEntity
  end

  desc 'Allow updating of a Journey'
  params do
    requires :id, type: Integer, desc: 'ID of Journey'
    optional :student_id, type: Integer, desc: 'student ID'
  end
  put '/journeys/:id' do
    journey_parameters = ActionController::Parameters
       .new(params)
       .permit(
         :student_id
       )

    # Auth

    result = Journey.find(params[:id])
    result.update!(journey_parameters)

    present result, with: Entities::JourneysEntity
  end

  desc 'Delete the journey with the indicated id'
  params do
    requires :id, type: Integer, desc: 'ID of the journey'
  end
  delete '/journeys/:id' do
    Journey.find(params[:id]).destroy!

    return true
  end

  desc 'Get all the journeys'
  get '/journeys' do
    result = Journey.all

    present result, with: Entities::JourneysEntity
  end
end
