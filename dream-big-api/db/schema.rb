# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_08_23_000001) do
  create_table "avatar_accessories", charset: "utf8mb4", force: :cascade do |t|
    t.string "color"
    t.string "shape"
    t.string "texture"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "avatar_hairs", charset: "utf8mb4", force: :cascade do |t|
    t.string "color"
    t.string "shape"
    t.string "texture"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "avatar_heads", charset: "utf8mb4", force: :cascade do |t|
    t.string "color"
    t.string "shape"
    t.string "texture"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "avatar_torsos", charset: "utf8mb4", force: :cascade do |t|
    t.string "color"
    t.string "shape"
    t.string "texture"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "avatars", charset: "utf8mb4", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "categories", charset: "utf8mb4", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.integer "weight"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "course_units", charset: "utf8mb4", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "course_versions", charset: "utf8mb4", force: :cascade do |t|
    t.date "startdate"
    t.date "enddate"
    t.date "datecensus"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "courses", charset: "utf8mb4", force: :cascade do |t|
    t.string "name"
    t.string "courseDesc"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "journey_stars", charset: "utf8mb4", force: :cascade do |t|
    t.boolean "isMaxed"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "planet_skins", charset: "utf8mb4", force: :cascade do |t|
    t.string "color"
    t.string "asset"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "planets", charset: "utf8mb4", force: :cascade do |t|
    t.boolean "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "role_types", charset: "utf8mb4", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "roles", charset: "utf8mb4", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "star_skins", charset: "utf8mb4", force: :cascade do |t|
    t.string "colour"
    t.string "asset"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "star_systems", charset: "utf8mb4", force: :cascade do |t|
    t.boolean "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "stars", charset: "utf8mb4", force: :cascade do |t|
    t.string "goals"
    t.string "reflection"
    t.boolean "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "student_courses", charset: "utf8mb4", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "student_journeys", charset: "utf8mb4", force: :cascade do |t|
    t.float "timeline"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "students", charset: "utf8mb4", force: :cascade do |t|
    t.string "name"
    t.integer "phone"
    t.string "address"
    t.string "student_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.index ["user_id"], name: "fk_rails_148c9e88f4"
  end

  create_table "units", charset: "utf8mb4", force: :cascade do |t|
    t.string "name"
    t.string "description", limit: 4096
    t.string "code"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", charset: "utf8mb4", force: :cascade do |t|
    t.string "name"
    t.string "username"
    t.string "password"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "weight_values", charset: "utf8mb4", force: :cascade do |t|
    t.integer "weight"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "students", "users"
end
