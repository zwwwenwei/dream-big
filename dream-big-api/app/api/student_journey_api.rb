require 'grape'

class StudentJourneyApi < Grape::API
  desc 'Allow retrieval of a single journey journey'
  get '/journey/:id' do
    parameters = ActionController::Parameters.new(params)
      .permit(
        :id
      )

    # Auth for user->journey
      # this should send a 404 response when the model isn't found
    result = StudentJourney.find(params[:id])
    present result, with: Entities::StudentJourneyEntity
  end

  desc 'Allow creation of a Student journey'
  params do
  
    requires :timeline, type: String, desc: 'timeline'
    requires :student_id, type: Integer, desc: 'journey id'

  end
  post '/journey' do
    parameters = ActionController::Parameters.new(params)
      .permit(
        :timeline,
        :student_id
      )

    # Auth...

    result = StudentJourney.create!(parameters) 

    present result, with: Entities::StudentJourneyEntity
  end

  desc 'Allow updating of a journey'
  params do
    
    optional :timeline, type: String, desc: 'journey timeline'
    optional :student_id, type: Integer, desc: 'journey student'

  end
  put '/journey/:id' do
    parameters = ActionController::Parameters.new(params)
      .permit(
        :timeline,
        :student_id
      )

    # Auth

    result = StudentJourney.find(params[:id])
    result.update! parameters

    present result, with: Entities::StudentJourneyEntity
  end

  desc 'Delete the journey with the indicated id'
  params do
    requires :id, type: Integer, desc: 'The id of the journey to delete'
  end
  delete '/journey/:id' do
    StudentJourney.find(params[:id]).destroy!
    true
  end

  desc 'Retrieve all journeys for a given student'
  params do
    # requires :student_id, type: Integer, desc: 'The id of the student to retrieve all journeys for'
  end
  get '/journey' do
    # result = StudentJourney.where(student_id: params[:student_id])
    result = StudentJourney.all

    present result, with: Entities::StudentJourneyEntity
  end
end