require 'grape'

class StarSystemApi < Grape::API

  desc 'Allow creation of a Star System'
  params do
  
    requires :status, type: String, desc: 'Status of a star system (complete/incomplete)'

  end
  post '/starsystem' do
    starsystem_parameters = ActionController::Parameters.new(params)
      .permit(
        :status
      )

    # Auth...

    result = StarSystem.create!(starsystem_parameters)

    present result, with: Entities::StarSystemEntity
  end

  desc 'Allow updating of a Star System'
  params do
    
    optional :status, type: String, desc: 'Status of a star system'
  end
  put '/starsystem/:id' do
    starsystem_parameters = ActionController::Parameters.new(params)
      .permit(
        :system
        #Ex:- :default =>''
      )

    # Auth

    result = StartSystem.find(params[:id])
    result.update! starsystem_parameters

    present result, with: Entities::StarSystemEntity
  end

  desc 'Delete the star system with the indicated id'
  params do
    requires :id, type: Integer, desc: 'The id of the system to delete'
  end
  delete '/starsystem/:id' do
    StarSystem.find(params[:id]).destroy!
    true
  end

  get '/starsystem' do
    result = StarSystem.all

    present result, with: Entities::StarSystemEntity
  end
end