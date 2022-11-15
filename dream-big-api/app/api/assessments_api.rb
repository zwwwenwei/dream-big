require 'grape'

class AssessmentsApi < Grape::API
  desc 'Allow retrieval of an Answer in the Assessment'
  get '/assessments/:id' do
    assessments_parameters = ActionController::Parameters.new(params)
      .permit(
        :id,
        :journey_id,
        :category_id,
        :timestamps
      )

    # Auth

    result = Assessments.find(params[:id])
    present result, with: Entities::AssessmentsEntity
  end

  desc 'Allow creation of an Assessments'
  params do

    requires :id , type: Integer, desc: 'Assessment ID'
    requires :journey_id, type: Integer, desc: 'Journey ID'
    requires :category_id, type: Integer, desc: 'category ID'
    requires :timestamps, type: Integer, desc: 'Timestamp of assessment'
  end
  post '/assessments' do
    assessments_parameters = ActionController::Parameters.new(params)
      .permit(
        :id,
        :journey_id,
        :category_id,
        :timestamps
   
      )

    # Auth...

    result = Assessments.create!(assessments_parameters)

    present result, with: Entities::AssessmentsEntity
  end

  desc 'Allow updating of a Assessments'
  params do
    requires :id , type: Integer, desc: 'Assessment ID'
    optional :journey_id, type: Integer, desc: 'Journey ID'
    optional :category_id, type: Integer, desc: 'category ID'
    optional :timestamps, type: Integer, desc: 'Timestamp of assessment'

  end
  put '/assessments/:id' do
    assessments_parameters = ActionController::Parameters.new(params)
      .permit(
        :id,
        :journey_id,
        :category_id,
        :timestamps
      )

    # Auth

    result = Assessments.find(params[:id])
    result.update! assessments_parameters

    present result, with: Entities::AssessmentsEntity
  end

  desc 'Delete the Assessments with the indicated id'
  params do
    requires :id , type: Integer, desc: 'Assessment ID'
  end
  delete '/assessments/:id' do
    Assessments.find(params[:id]).destroy!
    true
  end

  get '/assessments' do
    result = Assessments.all

    present result, with: Entities::AssessmentsEntity
  end
end