require 'grape'

class WeightValuesApi < Grape::API

  desc 'Allow addtion of Category Weight Values'
  params do
    requires :weight, type: Integer, desc: 'The value '
  end
  post '/weight' do
    weight_value_parameters = ActionController::Parameters.new(params)
      .permit(
        :weight,
      )

    # Auth...

    result = WeightValue.create!(weight_value_parameters)

    present result, with: Entities::WeightValuesEntity
  end

  desc 'Allow updating of a Weight Value'
  params do
    requires :weight_value_id, type: Integer, desc: 'the ID of the weight Value'
    optional :weight, type: Integer, desc: 'The value '
  end
  put '/weight/:id' do
    weight_value_parameters = ActionController::Parameters.new(params)
      .permit(
        :weight

        #Ex:- :default =>''
      )

    # Auth

    result = WeightValue.find(params[:id])
    result.update! weight_value_parameters

    present result, with: Entities::WeightValuesEntity
  end

  desc 'Delete the Weight Value with the indicated id'
  params do
    requires :id, type: Integer, desc: 'The ID of Value to delete '
  end
  delete '/weight/:id' do
    WeightValue.find(params[:id]).destroy!
    true
  end

  desc 'Get the weight with the indicated id'
  params do
    requires :id, type: Integer, desc: 'The id of the weight Value'
  end
  get '/weight/:id' do
    result = WeightValue.where(id: params[:id])


    present result, with: Entities::WeightValuesEntity
  end
end