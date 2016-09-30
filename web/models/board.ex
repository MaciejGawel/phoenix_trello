defmodule PhoenixTrello.Board do
  use PhoenixTrello.Web, :model

  @derive {Poison.Encoder, only: [:id, :name, :user]}

  schema "boards" do
    field :name, :string
    belongs_to :user, PhoenixTrello.User

    has_many :user_boards, PhoenixTrello.UserBoard
    has_many :members, through: [:user_boards, :user]
    has_many :lists, PhoenixTrello.List

    timestamps()
  end

  @required_fields ~w(name user_id)
  @optional_fields ~w()

  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end

  def slug_id(board) do
    "#board.is}-#{board.slug}"
  end
end
